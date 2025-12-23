
import BookRequestForm from "@/components/BookRequestForm";
import {useRouter} from "next/router";
const RequestBook=()=>{

    const router=useRouter();
    console.log("router?.query",router?.query)
let bookName=router?.query?.bookName as string ||''
return (
    <div className="m-10">
    <BookRequestForm initialBookName={bookName}/>
    </div>
)
}


export default RequestBook;