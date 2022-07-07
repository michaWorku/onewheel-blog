import type {
    BlockTool,
    BlockToolConstructorOptions,
  } from '@editorjs/editorjs';
  
  interface ExampleBlockToolConfig {
    availableIds: string[];
  }
  
  interface ExampleBlockToolData {
    id?: string;
    name: string;
  }
  
  interface ValidatedExampleBlockToolData extends ExampleBlockToolData {
    id: string;
  }