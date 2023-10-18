import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { intToMoney } from "../../services/utils/format";
import {
  sumTotal,
  sumTotalPayments,
  sumTotalPreWage,
  sumTotalRealPayment,
} from "../../services/utils/sumTotal";
import dayjs from "dayjs";

export default function paymentsPdfGenerator(employees, workingDays) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const data = employees.map((employee) => {
    const preWage = (employee.wage * 0.3).toFixed(0);
    const workedDays = employee.employees_worked_days.length;
    const fullPayment = (
      employee.wage -
      (workingDays - workedDays) * (employee.wage * 0.05)
    ).toFixed(0);
    const foodTotal = sumTotal(employee.employees_food);
    const realPayment = (fullPayment - preWage - foodTotal).toFixed(0);
    const warning = employee.obs.includes("!") ? "! " : "";

    return [
      { text: `${warning}${employee.name}`, fontSize: 7, margin: [0, 2, 0, 2] },
      {
        text: `R$${intToMoney(employee.wage)}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
      { text: `R$${intToMoney(preWage)}`, fontSize: 7, margin: [0, 2, 0, 2] },
      { text: employee.pix, fontSize: 7, margin: [0, 2, 0, 2] },
      {
        text: `${workedDays}/${workingDays}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
      {
        text: `R$${intToMoney(employee.loan)}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
      {
        text: `R$${intToMoney(fullPayment)}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
      {
        text: `- R$${intToMoney(foodTotal)}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
      {
        text: `R$${intToMoney(realPayment)}`,
        fontSize: 7,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const total = sumTotalPayments(employees, workingDays).toFixed(0);
  const preWageTotal = sumTotalPreWage(employees);
  const realPaymentTotal = sumTotalRealPayment(employees, workingDays);
  const today = Date.now();
  const pdfHeader = [
    {
      text: `Pagamentos - ${dayjs(today).format("DD/MM/YY")}`,
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];
  const pdfContent = [
    {
      table: {
        headerRows: 1,
        widths: [50, 40, 40, 100, 30, 50, 40, 40, 40],
        body: [
          [
            {
              text: "Funcionário",
              style: "tableHeader",
              fontSize: 8,
              bold: true,
            },
            { text: "Base", style: "tableHeader", fontSize: 8, bold: true },
            { text: "Vale", style: "tableHeader", fontSize: 8, bold: true },
            { text: "PIX", style: "tableHeader", fontSize: 8, bold: true },
            { text: "Dias", style: "tableHeader", fontSize: 8, bold: true },
            {
              text: "Emprestado",
              style: "tableHeader",
              fontSize: 8,
              bold: true,
            },
            { text: "Bruto", style: "tableHeader", fontSize: 8, bold: true },
            { text: "Marmitas", style: "tableHeader", fontSize: 8, bold: true },
            { text: "Líquido", style: "tableHeader", fontSize: 8, bold: true },
          ],
          ...data,
        ],
      },
      layout: "lightHorizontalLines",
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Vale Total",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
            {
              text: "Total Bruto",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
            {
              text: "Total Líquido",
              style: "tableHeader",
              fontSize: 12,
              bold: true,
            },
          ],
          [
            {
              text: `R$ ${intToMoney(preWageTotal)}`,
              fontSize: 11,
              margin: [0, 2, 0, 2],
            },
            {
              text: `R$ ${intToMoney(total)}`,
              fontSize: 11,
              margin: [0, 2, 0, 2],
            },
            {
              text: `R$ ${intToMoney(realPaymentTotal)}`,
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

  pdfMake.createPdf(docDefinitions).open();
}
