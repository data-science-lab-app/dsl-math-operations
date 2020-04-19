import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, NumberOption } from 'data-science-lab-core';

export class MultiplyOperation extends TransformPlugin {

    options: MultiplyOperationPluginOptions;
    inputs: MultiplyOperationPluginInputs;

    inputData?: PluginData;
    multipler: number;

    constructor() {
        super();
        this.options = new MultiplyOperationPluginOptions(this);
        this.inputs = new MultiplyOperationPluginInputs(this);
        this.multipler = 0;
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
                examples: this.inputData.examples.map((row) => row.map((value) => value * this.multipler))
            };
        }
        throw new Error('Multiply Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

    setMultiplier(adder: number) {
        this.multipler = adder;
    }

}

class MultiplyOperationPluginInputs extends PluginInputs {
    constructor(public converter: MultiplyOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to be multiply by',
                min: 1,
                type: 'number'
            }
        ];
    }
}

class MultiplyOperationPluginOptions extends PluginOptions {

    state: number;

    constructor(public operation: MultiplyOperation) {
        super();
        this.state = 1;
    }
    
    submit(inputs: { [id: string]: any; }): void {
        this.operation.setMultiplier(inputs['number']);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new NumberOption({
                id: 'number',
                label: 'Multiplier',
            })
        ]
    }
    noMore(): boolean {
        return this.state === 2;
    }

}
