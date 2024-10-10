import React, { useState } from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import HostedApi from '../../api/axios'; 
import QueryTable from '../../components/tables/Bin/Querytable'
import PageLayout from '../../layouts/PageLayout'
import {Input} from '../../components/elements'
import {  CardHeader } from '../../components/cards';

const Query = () => {
  const [queryData, setqueryData] = useState(null)
  const [query, setQuery] = useState("");


  const getAllqueryData = useCallback( async () => {
    try {
        await HostedApi({
          url: "/enquiry-form",
          method: 'GET',
        }). then((response) => {
          setqueryData(response.data)
        })
    }
    catch(err){
        console.log(err)
    }
  })

  useEffect(() => {
   getAllqueryData();
   return () => { };
  }, [])

 

  return (
   <PageLayout>
  <CardHeader title={"Query details"}  />
  <QueryTable querydata={queryData} />
   </PageLayout>
  )
}

export default Query