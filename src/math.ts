import {Command} from "commander";
import figlet from "figlet";

console.log(figlet.textSync("Impara   la   matematica"));

const program = new Command();

program
    .version("0.0.1")
    .description("Impara le tabelline")

program
    .argument('<numero>', "Tabellina da imparare")
    .option('-m, --mode [modo]', 'Ordine: crescente, descrescente, casuale', 'casuale')

program.parse(process.argv)

const options = program.opts();

console.log(JSON.stringify(options))