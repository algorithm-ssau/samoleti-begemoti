import { assert, is } from "typia";
import { Request } from "express";

export class BaseParser {
    parseId(req: Request): number {
        const valueId = req.params.id;
        if (valueId == undefined) {
            throw new Error("param is undefined");
        }

        const id = Number.parseInt(valueId);
        return id;
    }
}

export class RequestParser<T> extends BaseParser {
    /**
     * Ограничение `typia` к сожалению не позволяет реализовать это как метод `RequestParser`
     *
     * ```
     * export function parseBody<T>(req: Request): T {
     *   const body = req.body;
     *   return assert<T>(body);
     * }
     * ```
     */
    parseBody(req: Request): T {
        throw new Error(
            "not implemented, you probably want to override parseBody in your child Parser"
        );
    }

    parseUpdateSingle(req: Request): { id: number; user: T } {
        const id = this.parseId(req);
        const user = this.parseBody(req);

        return { id, user };
    }
    parseCreate(req: Request) {
        return this.parseBody(req.body);
    }

    parseGetSingle(req: Request): number {
        return this.parseId(req);
    }
}
