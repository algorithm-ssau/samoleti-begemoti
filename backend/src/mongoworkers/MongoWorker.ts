import { AnyObject, Model } from "mongoose";

export class MongoWorker<T extends AnyObject, M extends Model<T>> {
    constructor(protected MyModel: M) {}

    create = async (value: T) => {
        return await this.MyModel.create<T>(value);
    };

    getAll = async () => {
        const refKeys = getRefKeys(this.MyModel);

        let query = this.MyModel.find();
        if (refKeys.length > 0) {
            return query.populate(refKeys).exec();
        }
        return await query.exec();
    };

    getOne = async (valueId: number) => {
        const refKeys = getRefKeys(this.MyModel);

        let query = this.MyModel.findOne({ _id: valueId });

        if (refKeys.length > 0) {
            return await query.populate(refKeys);
        }

        return await query;
    };

    deleteOne = async (valueId: number) => {
        return await this.MyModel.findOneAndDelete({
            _id: valueId,
        });
    };

    getOneByKey = async <K extends string & keyof T>(key: K, value: T[K]) => {
        const filter = { [key]: value } as { [P in keyof T]: any };

        return await this.MyModel.findOne(filter);
    };
    updateOne = async (valueId: number, body: T) => {
        return await this.MyModel.findOneAndUpdate(
            {
                _id: valueId,
            },
            body
        );
    };
}

export function getKeys<M extends Model<any>>(MyModel: M): string[] {
    return Object.keys(MyModel.schema.obj);
}

export function getRefKeys<M extends Model<any>>(model: M): string[] {
    const definition = model.schema.obj as Record<string, any>;
    const refKeys = Object.keys(definition).filter(
        key => definition[key].ref || definition[key][0]?.ref
    );
    return refKeys;
}

export function createLiteral<V, K extends string>(
    key: K,
    value: V
): { [P in K]: V } {
    return { [key as K]: value } as { [P in K]: V };
}
