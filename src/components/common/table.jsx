import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './TableBody';

const Table = ({columns,sortColumn,onSort,data}) => {
    return ( 
        <table className="table">
        <TableHeader 
        columns={columns} 
        sortColumn={sortColumn} 
        onSort={onSort}>
        </TableHeader>
        <TableBody data={data}
        columns={columns}>
        </TableBody>
        </table>
     );
}
 
export default Table;