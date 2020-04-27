import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class MultiplyOperation extends TransformPlugin {
    options: MultiplyOperationPluginOptions;
    inputs: MultiplyOperationPluginInputs;
    inputData?: PluginData;
    multipler: number;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
    setMultiplier(adder: number): void;
}
declare class MultiplyOperationPluginInputs extends PluginInputs {
    converter: MultiplyOperation;
    constructor(converter: MultiplyOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class MultiplyOperationPluginOptions extends PluginOptions {
    operation: MultiplyOperation;
    state: number;
    constructor(operation: MultiplyOperation);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
