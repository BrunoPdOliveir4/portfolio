export const eventDrivenTS = `import { Channel, connect } from 'amqplib';

interface Event<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
  correlationId: string;
}

class EventBus {
  private channel: Channel;

  async publish<T>(event: Event<T>): Promise<void> {
    const exchange = 'domain.events';
    await this.channel.assertExchange(exchange, 'topic', { durable: true });

    this.channel.publish(
      exchange,
      event.type,
      Buffer.from(JSON.stringify(event)),
      { persistent: true, correlationId: event.correlationId }
    );
  }

  async subscribe(pattern: string, handler: (event: Event) => Promise<void>) {
    const queue = \`\${pattern}.queue\`;
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, 'domain.events', pattern);

    this.channel.consume(queue, async (msg) => {
      if (!msg) return;
      const event: Event = JSON.parse(msg.content.toString());

      try {
        await handler(event);
        this.channel.ack(msg);
      } catch (error) {
        this.channel.nack(msg, false, true); // requeue
      }
    });
  }
}`;

export const eventDrivenPython = `import json
import aio_pika
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Callable, Awaitable

@dataclass
class Event:
    type: str
    payload: dict[str, Any]
    timestamp: datetime
    correlation_id: str

class EventBus:
    def __init__(self, channel: aio_pika.Channel):
        self.channel = channel

    async def publish(self, event: Event) -> None:
        exchange = await self.channel.declare_exchange(
            "domain.events", aio_pika.ExchangeType.TOPIC, durable=True
        )

        await exchange.publish(
            aio_pika.Message(
                body=json.dumps(event.__dict__, default=str).encode(),
                delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
                correlation_id=event.correlation_id,
            ),
            routing_key=event.type,
        )

    async def subscribe(
        self, pattern: str, handler: Callable[[Event], Awaitable[None]]
    ) -> None:
        exchange = await self.channel.declare_exchange(
            "domain.events", aio_pika.ExchangeType.TOPIC, durable=True
        )
        queue = await self.channel.declare_queue(f"{pattern}.queue", durable=True)
        await queue.bind(exchange, routing_key=pattern)

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    event = Event(**json.loads(message.body))
                    await handler(event)`;
