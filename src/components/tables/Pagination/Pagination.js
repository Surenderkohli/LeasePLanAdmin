// import { useState } from "react";

// export const paginationTable = (data)=>{
//   const [itemOffset, setItemOffset] = useState(0);

//   const itemsPerPage = 6;

//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = data?.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(data?.length / itemsPerPage);
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % data?.length;;
//     setItemOffset(newOffset);
//   };
//   return currentItems
// }