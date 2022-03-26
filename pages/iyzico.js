import Head from "next/head";
import React, { useEffect } from "react";

export default function iyzico() {
  function loadScript(scriptUrl) {
    const script = document.createElement("script");
    script.src = scriptUrl;
    document.body.appendChild(script);

    return new Promise((res, rej) => {
      script.onload = function () {
        res();
      };
      script.onerror = function () {
        rej();
      };
    });
  }
  useEffect(() => {
    fetch("/api/iyzico",{method:'GET'})
    .then((res) => res.json())
    .then(res=>{console.log(res.checkoutFormContent)
        let script = document.createElement('script');
        console.log(res.checkoutFormContent.split('<script type="text/javascript">')[1].split('</script>')[0])
        // var z = document.createElement('p'); 
        // z.innerHTML = res.checkoutFormContent
        script.innerHTML=res.checkoutFormContent.split('<script type="text/javascript">')[1].split('</script>')[0]
        document.body.appendChild(script);});

  }, []);

  return (
    <div id="body">
      <Head>
        <title>Norda</title>
        <meta name="description" content="E-commerce web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div id="iyzipay-checkout-form" className="responsive"></div>

      </body>
    </div>
  );
}
