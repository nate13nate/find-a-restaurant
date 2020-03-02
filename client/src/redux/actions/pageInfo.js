// changes the page number recorded
// changes searchInfo by adding an offset parameter based on the pageNum value 
export const changePageNum = pageNum => ({ type: 'CHANGE_PAGE_NUM', payload: pageNum });
