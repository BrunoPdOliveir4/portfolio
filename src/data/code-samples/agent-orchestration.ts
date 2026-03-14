export const agentOrchestrationTS = `import { RabbitMQ } from './messaging';
import { MCPClient } from './mcp';

interface AgentTask {
  id: string;
  tenantId: string;
  agentId: string;
  input: string;
  context: Record<string, unknown>;
}

interface AgentResult {
  taskId: string;
  output: string;
  toolCalls: ToolCall[];
  tokensUsed: number;
}

class AgentOrchestrator {
  constructor(
    private mq: RabbitMQ,
    private mcp: MCPClient,
    private cache: Redis,
  ) {}

  async dispatch(task: AgentTask): Promise<AgentResult> {
    // Check cached response for identical context
    const cacheKey = \`agent:\${task.agentId}:hash:\${hash(task.input)}\`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // Load agent tools via MCP
    const tools = await this.mcp.listTools(task.agentId);

    // Publish to processing queue (per-tenant isolation)
    const queue = \`agents.\${task.tenantId}\`;
    const result = await this.mq.rpc<AgentTask, AgentResult>(queue, task);

    // Cache result with TTL
    await this.cache.setex(cacheKey, 3600, JSON.stringify(result));

    return result;
  }

  async registerAgent(tenantId: string, config: AgentConfig) {
    // Each tenant gets isolated agent instances
    await this.mq.assertQueue(\`agents.\${tenantId}\`, { durable: true });
    await this.mcp.registerTools(config.tools);
  }
}`;

export const agentOrchestrationPython = `import hashlib
import json
from dataclasses import dataclass
from redis.asyncio import Redis
from aio_pika import Channel

@dataclass
class AgentTask:
    id: str
    tenant_id: str
    agent_id: str
    input: str
    context: dict

@dataclass
class AgentResult:
    task_id: str
    output: str
    tool_calls: list[dict]
    tokens_used: int

class AgentOrchestrator:
    def __init__(
        self,
        channel: Channel,
        mcp_client: MCPClient,
        cache: Redis,
    ):
        self.channel = channel
        self.mcp = mcp_client
        self.cache = cache

    async def dispatch(self, task: AgentTask) -> AgentResult:
        # Check cached response for identical context
        input_hash = hashlib.sha256(task.input.encode()).hexdigest()[:16]
        cache_key = f"agent:{task.agent_id}:hash:{input_hash}"

        cached = await self.cache.get(cache_key)
        if cached:
            return AgentResult(**json.loads(cached))

        # Load agent tools via MCP
        tools = await self.mcp.list_tools(task.agent_id)

        # Publish to processing queue (per-tenant isolation)
        queue_name = f"agents.{task.tenant_id}"
        result = await self._rpc_call(queue_name, task)

        # Cache result with TTL
        await self.cache.setex(
            cache_key, 3600, json.dumps(result.__dict__)
        )

        return result

    async def register_agent(self, tenant_id: str, config: AgentConfig):
        # Each tenant gets isolated agent instances
        queue = await self.channel.declare_queue(
            f"agents.{tenant_id}", durable=True
        )
        await self.mcp.register_tools(config.tools)`;
