import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10)

  const fetchApi = async()=> {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=${totalPages}&skip=${page * 10 - 10}`);
      if(response.data){
        let data = response.data.products
        setTotalPages(response.data.total / 10)
        console.log(data);
        setProducts(data);
      }
    } catch (error) {
      alert(error);
      console.error(error.messsage);
    }
    
  }

  useEffect(() => {
    fetchApi();
  },[page]);


  const selectPageHandler = (selectedpage)=> {
    if (selectedpage >= 1 && selectedpage <= totalPages && selectedpage !== page){
      setPage(selectedpage);
    }
    
  }

  return (
    <>
      <div className="app mb-[100px]">
        <h1 className="text-red-600 text-5xl text-center font-semibold underline mb-5">
          Pagination
        </h1>
        {products.length > 0 && <div className="produdt__list grid sm:grid-cols-1 md:grid-cols-2 gap-5 px-10">
          {products.map((product, index)=>(
            <div className="product__single flex border py-2 rounded-lg" key={product.id}>
              <div className="w-1/2"><img className="w-[200px] h-[150px] object-cover border-[15px] " src={product.thumbnail} alt={product.title}/></div>
              <div className="w-1/2 flex items-center"><span>{product.title}</span></div>
            </div>
          ))}
        </div> }

        {products.length > 0 && <div className="fixed bottom-0 w-full pagination flex flex-shrink justify-center items-center py-4 bg-red-200">
          <span className={`${page == 1 && "opacity-0"} cursor-pointer`} onClick={()=> selectPageHandler(page - 1)}>⏮</span>
          {
            [...Array(totalPages)].map((_, i)=>(
              <span className={`${page === i + 1 && "bg-gray-500"} border border-[black] px-[1%] mx-[1px] cursor-pointer`} key={i} onClick={()=> {

                selectPageHandler(i + 1);
              }}>{i + 1}</span>
            ))
          }
          <span className={`${page == totalPages && "opacity-0"} cursor-pointer`} onClick={()=> selectPageHandler(page + 1)}>⏭</span>
        </div> }
      </div>
    </>
  );
}

export default App;
