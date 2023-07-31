import Script from "next/script";


export default function Footer() {
    return (
        <>        

            {/* <!-- toastr --> */}
            <Script src='/assets/toastr/toastr.min.js'></Script>
            {/* <Script type="text/javascript" src='../../node_modules/tw-elements/dist/js/tw-elements.umd.min.js'></Script> */}
        </>
    );
}