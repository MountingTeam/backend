import schema from '../../src/schemas/schema';
import { graphql } from "graphql";
import setupTest from "../setup-test";
import * as mongoose from "mongoose";

describe('UserSchema', async () => {
    beforeEach(async () =>
        await setupTest()
    );

    afterEach(async (done) => {
        mongoose.disconnect();
        return done();
    });

    afterAll(async (done) => {
        return done();
    });

    const name = "TestName"
    const updatedName = "NewTestName"

    it('query', async () => {

        const query = `
        query {
            users {
                id, 
                name
            }
        }
    `;

        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.users.length).toBe(0)
    });

    let id: string;

    it('mutation add', async () => {
        const query = `
            mutation {
                add (
                    name: "${name}"
                )
                {
                    id,
                    name
                }
            }
        `;
        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.add.name).toBe(name)
        id = data.add.id
    });

    it('query with id', async () => {

        const query = `
        query {
            user (
                id: "${id}"
            )
            {
                id, 
                name
            }
        }
    `;

        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.user[0].name).toBe(name)
    });

    it('mutation update', async () => {
        const query = `
            mutation {
                update (
                    id: "${id}",
                    name: "${updatedName}"
                )
                {
                    id,
                    name
                }
            }
        `;
        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.update.name).toBe(updatedName)
    });

    it('mutation delete', async () => {
        const query = `
            mutation {
                delete (
                    id: "${id}"
                )
                {
                    id,
                    name
                }
            }
        `;
        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.delete.id).toBe(id)
    });
});