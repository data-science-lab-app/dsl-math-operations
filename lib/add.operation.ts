import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, NumberOption } from 'data-science-lab-core';

export class AddOperation extends TransformPlugin {

    options: AddOperationPluginOptions;
    inputs: AddOperationPluginInputs;

    inputData?: PluginData;
    adder: number;

    constructor() {
        super();
        this.options = new AddOperationPluginOptions(this);
        this.inputs = new AddOperationPluginInputs(this);
        this.adder = 0;
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    transform(): PluginData | PluginData[] {
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map((row) => row.map((value) => value + this.adder))
            };
        }
        throw new Error('Add Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

    toAdd(adder: number) {
        this.adder = adder;
    }

}

class AddOperationPluginInputs extends PluginInputs {
    constructor(public converter: AddOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to be add by',
                min: 1,
                type: 'number'
            }
        ];
    }
}

class AddOperationPluginOptions extends PluginOptions {

    state: number;

    constructor(public operation: AddOperation) {
        super();
        this.state = 1;
    }
    
    submit(inputs: { [id: string]: any; }): void {
        this.operation.toAdd(inputs['number']);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new NumberOption({
                id: 'number',
                label: 'Number to add to feature',
            })
        ]
    }
    noMore(): boolean {
        return this.state === 2;
    }

}
