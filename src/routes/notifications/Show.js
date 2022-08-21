import React, { useState, useEffect } from 'react';
import Layout from "../../layout";
import {  axios, moment } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";
import { useParams } from "react-router-dom";

const ShowNotification = () => {

  const [data, setData] = useState({});
  const { contextData, setContextData } = useInventoryContext();
  const { id } = useParams();

  useEffect(() => {
           setContextData({...contextData, loading : true});
            axios.get("user/notifications/" + id)
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success') setData(data);
            })
            .catch(console.log)
            .finally(() => setContextData({...contextData, loading : false}))
  },[])


  return (
    <Layout>
          <div class="inner-page-wrapper">

        <header class="flex justify-between items-center">
            <h1 class="title">Notification</h1>
        </header>

        <main class="bg-white rounded-lg shadow-xl">
            <header class="p-5 py-3 border-b">
                <h1 class="title">{data?.notification_type?.title}</h1>
                <div>
                    <small>{moment(data?.created_at).format('d MMM, Y')}</small>
                </div>
            </header>

            <div class="p-5">

                <p>
                    {data?.notification_type?.message}
                </p>

                <p>
                    {data?.notification_specific_message}
                </p>
                
            </div>
            
        </main>
    </div>
    </Layout>
  );
}


export default ShowNotification;
