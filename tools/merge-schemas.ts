import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

const argv = yargs(hideBin(process.argv)).parse() as { subgraph?: string };

if (argv.subgraph) {
    const loadedFiles = loadFilesSync(`./${argv.subgraph}/src/typeDefs/*.graphql`);
    const typeDefs = mergeTypeDefs(loadedFiles);
    fs.writeFileSync(`./${argv.subgraph}/src/schema.graphql`, print(typeDefs));
}
