
const Pagination = ({ pokemonsPerPage, pokemonsAmount, paginate, currentPage, maxPageNumberLimit, minPageNumberLimit, handleNextPage, handlePrevPage }) => {


    const pages = []

    for(let i=1; i <= Math.ceil(pokemonsAmount/pokemonsPerPage); i++) {
        pages.push(i)        
    }

    const renderPagination = pages.map((num => {        
        if(minPageNumberLimit+1 > 2 && minPageNumberLimit === num){
            
        } 

        if(num < maxPageNumberLimit+1 && num > minPageNumberLimit) {
            return (
                <li key={num} className="page-item">
                    <button onClick={() => paginate(num)} className={ (currentPage === num) ? "page-link selected-page" : "page-link" }>
                        {num}
                    </button>                        
                </li>
            )
        } else {
            return null
        }

    }))    

    return (
        <nav>
            <ul className='pagination'>
               
                <li className="page-item">
                    <button onClick={() => handlePrevPage()} className='page-link'>Prev</button>
                </li>

                { renderPagination }

                <li className='pagination'>
                    <button onClick={() => handleNextPage()} className='page-link'>Next</button>
                </li>
                
            </ul>
        </nav>
    )
    
}

export default Pagination;