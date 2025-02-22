import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TestBuilderSchema } from './schema'
import { getCliOptions, runPythonCommand } from '../../utils/py-utils'

export function runBuilder(options: TestBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map((project) => {

      const root = project.root
      const testCmd = options.testCmd || `unittest discover -s ./ -p ${root}/src/*test*.py`

      return runPythonCommand(context, 'test', [testCmd], getCliOptions(options))
    }),
  )
}

export default createBuilder(runBuilder)