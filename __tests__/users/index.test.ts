import schema from '../../src/graphql';
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

    it('userQuery', async () => {
        const query = `
        query {
            userQuery {
                    id, 
                    name
            }
        }
        `;

        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.userQuery.length).toBe(0)
    });

    let id: string;

    it('mutation add', async () => {
        const query = `
            mutation {
                createUser (
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
        expect(data.createUser.name).toBe(name)
        id = data.createUser.id
    });

    it('query with id', async () => {
        const query = `
        query {
            userQuery(id: "${id}")
            {
                id, 
                name
            }
        }
    `;

        const response = await graphql(schema, query);
        const { data } = response;
        expect(data.userQuery[0].name).toBe(name)
    });

    it('mutation update', async () => {
        const query = `
            mutation {
                updateUser (
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
        expect(data.updateUser.name).toBe(updatedName)
    });

    it('mutation delete', async () => {
        const query = `
            mutation {
                deleteUser (
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
        expect(data.deleteUser.id).toBe(id)
    });
});