import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, NumberOption } from 'data-science-lab-core';

export class ModulusOperation extends TransformPlugin {

    options: ModulusOperationPluginOptions;
    inputs: ModulusOperationPluginInputs;

    inputData?: PluginData;
    modulus: number;

    constructor() {
        super();
        this.options = new ModulusOperationPluginOptions(this);
        this.inputs = new ModulusOperationPluginInputs(this);
        this.modulus = 0;
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
                examples: this.inputData.examples.map((row) => row.map((value) => value % this.modulus))
            };
        }
        throw new Error('Modulus Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

    setMultiplier(adder: number) {
        this.modulus = adder;
    }

}

class ModulusOperationPluginInputs extends PluginInputs {
    constructor(public converter: ModulusOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to be modulus by',
                min: 1,
                type: 'number'
            }
        ];
    }
}

class ModulusOperationPluginOptions extends PluginOptions {

    state: number;

    constructor(public operation: ModulusOperation) {
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
                label: 'Modulus',
            })
        ]
    }
    noMore(): boolean {
        return this.state === 2;
    }

}
