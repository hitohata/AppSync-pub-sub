import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { gql, GraphQLClient } from 'graphql-request'

const app = new Hono()

app.post('/demo', async (c) => {
    const body = await c.req.json()
    try {
        const data = await addDemo(body);
        c.header('Content-Type', 'application/json')
        c.status(201);
        return c.json(data);
    } catch (e) {
        c.header('Content-Type', 'application/json')
        c.status(400);
        return c.json({error: e.message});
    }
})

/**
 * Call gql
 * @param id
 * @param description
 */
const addDemo = async ({id, description}: {id: number, description: string}) => {
    const gqlClient = new GraphQLClient(process.env.URL!, {
        headers: {
            'x-api-key': process.env.KEY!,
        }
    })

    return await gqlClient.request(document, {
        description,
        id: id || null
    })
}

const document = gql`
        mutation addNewDemo ($description: String = "", $id: ID = "") {
            addDemo(input: {description: $description, id: $id}) {
                datetime
                description
                id
            }
        }
    `
export const handler = handle(app)
