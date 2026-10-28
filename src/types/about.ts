export interface Principle {
  title: string;
  titleEn: string;
  detail: string;
  detailEn: string;
}

export interface ToolGroup {
  category: string;
  categoryEn: string;
  tools: string[];
}

export interface About {
  story: string[];
  storyEn: string[];
  targetRoles: string[];
  availability: string;
  availabilityEn: string;
  principles: Principle[];
  uses: ToolGroup[];
}
