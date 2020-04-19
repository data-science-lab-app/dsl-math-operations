import { AddFeaturesOperation } from "./add-features.operation"

describe('Add Features Operation Tests', () => {
    let converter: AddFeaturesOperation;

    beforeEach(() => {
        converter = new AddFeaturesOperation();
    });

    it('options should return true for no more', () => {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            converter.getOptions().options();
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            converter.getOptions().submit({});
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('inputs should return one inputs', () => {
        expect(converter.getInputs().inputs().length).toBe(1);
    });

    it('submit a two list of numbers should add them together', () => {
        converter.getInputs().submit({
            'features':
            {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1 + f2'],
                examples: [[3], [7]]
            }
        )
    });

    it('submit three list of numbers should add them together', () => {
        converter.getInputs().submit({
            'features':
            {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1 + f2 + f3'],
                examples: [[6], [15]]
            }
        )
    });


});

