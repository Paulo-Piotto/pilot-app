import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {intToMoney} from "../../services/utils/format";
import { sumTotal } from "../../services/utils/sumTotal";
import dayjs from "dayjs";

export default function paymentsPdfGenerator(employees, workingDays) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const data = employees.map((employee) => {
    const preWage = (employee.wage * 0.3).toFixed(0);
    const workedDays = employee.employees_worked_days.length;
    const fullPayment = ((employee.wage * workedDays) /workingDays).toFixed(0);
    const foodTotal = sumTotal(employee.employees_food);
    const realPayment = (fullPayment - preWage - foodTotal).toFixed(0);

    return [
      { text: employee.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `R$${intToMoney(employee.wage)}`, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `R$${intToMoney(preWage)}`, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `${workedDays}/${workingDays}`, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `R$${intToMoney(fullPayment)}`, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `- R$${intToMoney(foodTotal)}`, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: `R$${intToMoney(realPayment)}`, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const pdfHeader = [
    {
      text: "Pagamentos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];
  const pdfContent = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*", "*", "*"],
        body: [
          [
            { text: "Funcionário", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Base", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Vale", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Dias", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Bruto", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Marmitas", style: "tableHeader", fontSize: 10, bold: true },
            { text: "Líquido", style: "tableHeader", fontSize: 10, bold: true },
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

  const today = Date.now()

  pdfMake.createPdf(docDefinitions).download(`pagamentos-${dayjs(today).format('DD-MM-YY')}.pdf`);
}
