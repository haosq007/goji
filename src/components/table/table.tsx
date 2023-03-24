import React, { useState, useMemo } from "react";
interface Props {
  data: any[];
  col: any[];
}
const Table = (props: Props) => {
  const { data, col } = props;
  const [sortBy, setSortBy] = useState(""); // 排序的字段
  const [filterBy, setFilterBy] = useState<any>(""); // 输入的字段
  const [tableData, setTableData] = useState(data);
  const [searchBy, setSearchBy] = useState<any>(""); // 筛选的字段

  // 点击表头排序
  const handleSort = (key: any) => {
    if (sortBy === key) {
      // 如果已经是该字段排序，则反向排序
      setTableData([...data].reverse());
    } else {
      // 否则按该字段正向排序
      setTableData([...data].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortBy(key);
    }
  };
  const callback = useMemo(() => {
    if (searchBy) {
      setTableData(data.filter((item) => item[col[0]] === Number(searchBy)));
    } else {
      setTableData(data);
    }
  }, [searchBy]);
  // 判断输入筛选是否合格
  const handSearch = (value: String) => {
    setSearchBy(value);
  };
  return (
    <table>
      <thead>
        <tr>
          {col.map((key) => (
            <th key={key} onClick={() => handleSort(key)}>
              {key}
              {sortBy === key ? "↑" : ""}
            </th>
          ))}
        </tr>
        <tr>
          <th colSpan={col.length}>
            <input
              placeholder="Search"
              value={searchBy}
              onChange={(e) => {
                handSearch(e.target.value);
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {col.map((key, colIndex) => (
              <td key={colIndex}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
