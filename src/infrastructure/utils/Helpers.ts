export const sortData = (data: any[], column: string, sort: string) =>
  data.sort((a: any, b: any) =>
    a[column] > b[column] ? (sort === "asc" ? 1 : -1) : -1
  );

export const parseXml = (
  data: any[],
  attribute: string,
  attributes: string
) => {
  return {
    [attributes]: data.map((column: any) => ({
      [attribute]: Object.keys(column).map((i: any) => ({
        [i]: column[i],
      })),
    })),
  };
};
