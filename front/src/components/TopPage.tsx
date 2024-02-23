'use client'
import { Amplify } from 'aws-amplify';
import {generateClient} from "aws-amplify/api";
import {useEffect, useState} from "react";
import {DemoSubscriptionDocument, GetDemoDocument} from "@/gql/graphql";
import { DemoElement } from './demo'

  Amplify.configure({
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_URI!,
      region: 'us-east-2',
      defaultAuthMode: 'apiKey',
      apiKey: process.env.NEXT_PUBLIC_API_KEY
    }
  }
});


const getDemo = async () => {

  const client = generateClient();
  return client.graphql({
    query: GetDemoDocument,
    variables: {
      id: 1
    }
  });

}

export const TopPage = () => {
  const [data, setData] = useState(null)
  const [subData, setSubData] = useState([])

  useEffect(() => {
    getDemo().then(res => {
      // @ts-ignore
      res.data && setData(res.data)
    })
  }, []);

  useEffect(() => {
    const client = generateClient();
    const sub = client.graphql({
      query: DemoSubscriptionDocument,
      variables: {id: 1}
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: (data) => {
          addNewSubscribedData(data.data.onAddDemo)
      }
    })
    return () => sub.unsubscribe()
  }, [])

  const addNewSubscribedData = (data: any) => {
    // @ts-ignore
    setSubData(pre => [...pre, data]);
  }

  return (
      <>
        <section>
          <h2>Query Result</h2>
          {data
              // @ts-ignore
              ? <DemoElement {...data.demo} />
              : <p>none</p> }
        </section>
        <section>
          <h2>Subscription Result</h2>
          { subData?.length > 0 && subData.map((d, index) =>
              // @ts-ignore
              <DemoElement {...d} key={index.toString()} />)
          }
        </section>
      </>
  )
}