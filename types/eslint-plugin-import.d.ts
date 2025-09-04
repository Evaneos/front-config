declare module 'eslint-plugin-import' {
    import type { Linter } from 'eslint';

    interface EslintPluginImport {
        rules: Record<string, Linter.RuleModule>;
        configs?: Record<string, Linter.Config>;
        processors?: Record<string, Linter.Processor>;
    }

    const plugin: EslintPluginImport;
    export default plugin;
}
