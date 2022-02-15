import Call from "../Call/Call";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";

const Calls = ({calls, updateCall, itemsPerPage, enablePagination}) => {
    const [currentItems, setCurrentItems] = useState(calls);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(calls.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(calls.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, updateCall]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % calls.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {enablePagination === true ? (
                <>
                    {currentItems.map((call) => (
                        <Call updateCall={updateCall} key={call.id} call={call}/>
                    ))}
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </>
            ) : (
                calls.map((call) => (
                    <Call updateCall={updateCall} key={call.id} call={call}/>
                ))
            )}
        </>
    );
};

Calls.propTypes = {
    calls: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })),
    updateCall: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number
}

export default Calls;