import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class ModulusOperation extends TransformPlugin {
    options: ModulusOperationPluginOptions;
    inputs: ModulusOperationPluginInputs;
    inputData?: PluginData;
    modulus: number;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
    setMultiplier(adder: number): void;
}
declare class ModulusOperationPluginInputs extends PluginInputs {
    converter: ModulusOperation;
    constructor(converter: ModulusOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ModulusOperationPluginOptions extends PluginOptions {
    operation: ModulusOperation;
    state: number;
    constructor(operation: ModulusOperation);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
