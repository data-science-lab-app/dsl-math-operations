import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData, NumberOption } from 'data-science-lab-core';

export class ExponentiateOperation extends TransformPlugin {

    options: ExponentiateOperationPluginOptions;
    inputs: ExponentiateOperationPluginInputs;

    inputData?: PluginData;
    power: number;

    constructor() {
        super();
        this.options = new ExponentiateOperationPluginOptions(this);
        this.inputs = new ExponentiateOperationPluginInputs(this);
        this.power = 0;
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
                examples: this.inputData.examples.map((row) => row.map((value) => value ** this.power))
            };
        }
        throw new Error('Exponentiate Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

    setPower(adder: number) {
        this.power = adder;
    }

}

class ExponentiateOperationPluginInputs extends PluginInputs {
    constructor(public converter: ExponentiateOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to be the base of power',
                min: 1,
                type: 'number'
            }
        ];
    }
}

class ExponentiateOperationPluginOptions extends PluginOptions {

    state: number;

    constructor(public operation: ExponentiateOperation) {
        super();
        this.state = 1;
    }
    
    submit(inputs: { [id: string]: any; }): void {
        this.operation.setPower(inputs['number']);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new NumberOption({
                id: 'number',
                label: 'Power',
            })
        ]
    }
    noMore(): boolean {
        return this.state === 2;
    }

}
