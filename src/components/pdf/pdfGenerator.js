import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from "dayjs";
import {intToMoney} from "../../services/utils/format";

export default function pdfGenerator(items) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const data = items.map((item) => {
    return [
      { text: item.invoice, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: item.clients.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: item.stores.name, fontSize: 9, margin: [0, 2, 0, 2] },
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
      text: "Pedidos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];
  const pdfContent = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*"],
        body: [
          [
            { text: "Pedido", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Cliente", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Loja", style: "tableHeader", fontSize: 10, bold: true },
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

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    header: [pdfHeader],
    content: [pdfContent],
    footer: pdfFooter,
  };

  pdfMake.createPdf(docDefinitions).download("pedidos.pdf");
}
