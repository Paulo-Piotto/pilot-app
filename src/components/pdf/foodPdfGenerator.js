import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from "dayjs";
import { intToMoney } from "../../services/utils/format";

export default function foodPdfGenerator(items, total) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const data = items.map((item) => {
    return [
      { text: item.employees.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: item.type, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: intToMoney(item.value), fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: dayjs(item.date).format("DD/MM/YYYY"),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const pdfHeader = [
    {
      text: "Marmitas",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];
  const pdfContent = [
    {
      table: {
        headerRows: 1,
        widths: ["*"],
        body: [
          [
            {
              text: "Total:",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
          ],
          [
            {
              text: `R$ ${intToMoney(total)}`,
              fontSize: 11,
              margin: [0, 2, 0, 2],
            },
          ],
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 0, 0, 50],
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Funcionário",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
            { text: "Tipo", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Valor", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Data", style: "tableHeader", fontSize: 10, bold: true },
          ],
          ...data,
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];
  function pdfFooter(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const today = dayjs(Date.now()).format("DD-MM-YY");

  const docDefinitions = {
    pageSize: "A4",
    info: {
      title: `Marmitas-${today}`,
    },
    pageMargins: [15, 50, 15, 40],
    header: [pdfHeader],
    content: [pdfContent],
    footer: pdfFooter,
  };

  pdfMake.createPdf(docDefinitions).open();
}
