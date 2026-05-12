export interface ExcelFunction {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax: string;
  parameters: Parameter[];
  examples: Example[];
  tips?: string[];
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Example {
  description: string;
  formula: string;
  result: string | number;
  explanation: string;
}

export interface FunctionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
