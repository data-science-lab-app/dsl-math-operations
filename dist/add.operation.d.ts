import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class AddOperation extends TransformPlugin {
    options: AddOperationPluginOptions;
    inputs: AddOperationPluginInputs;
    inputData?: PluginData;
    adder: number;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
    toAdd(adder: number): void;
}
declare class AddOperationPluginInputs extends PluginInputs {
    converter: AddOperation;
    constructor(converter: AddOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class AddOperationPluginOptions extends PluginOptions {
    operation: AddOperation;
    state: number;
    constructor(operation: AddOperation);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
