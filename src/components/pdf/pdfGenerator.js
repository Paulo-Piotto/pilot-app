import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from "dayjs";
import { intToMoney } from "../../services/utils/format";

export default function pdfGenerator(items, total) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const trimmedTotal = total.replace(".", "");
  const liquidTotal =
    Number(trimmedTotal.replace(",", ".")) * 0.85 * 0.975 * 100;

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
    {
      table: {
        headerRows: 1,
        widths: ["*", "*"],
        body: [
          [
            {
              text: "Total sem descontos:",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
            {
              text: "Total com descontos (15% + 2,5%):",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
          ],
          [
            {
              text: `R$ ${total}`,
              fontSize: 11,
              margin: [0, 2, 0, 2],
            },
            {
              text: `R$ ${intToMoney(liquidTotal.toFixed(0))}`,
              fontSize: 11,
              margin: [0, 2, 0, 2],
            },
          ],
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 50, 0, 0],
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

  const today = Date.now();

  pdfMake
    .createPdf(docDefinitions)
    .download(`pedidos-${dayjs(today).format("DD-MM-YY")}.pdf`);
}
