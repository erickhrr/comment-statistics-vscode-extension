import * as vscode from "vscode";

function isCommentLine(line: string): boolean {
  const t = line.trim();
  // Простейшие маркеры комментариев (универсально для многих языков)
  return (
    t.startsWith("//") ||
    t.startsWith("#") ||
    t.startsWith("--") ||         // SQL
    t.startsWith("/*") ||
    t.startsWith("*") ||
    t.startsWith("<!--")          // HTML
  );
}

function extractTodos(text: string): { line: number; text: string }[] {
  const lines = text.split(/\r?\n/);
  const todos: { line: number; text: string }[] = [];

  // Ищем TODO / FIXME / NOTE / HACK (часто просят в отчётах)
  const re = /\b(TODO|FIXME|NOTE|HACK)\b[:]?\s*(.*)$/i;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (m) {
      const tag = m[1].toUpperCase();
      const rest = (m[2] ?? "").trim();
      todos.push({ line: i + 1, text: `${tag}: ${rest}`.trim() });
    }
  }
  return todos;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "comment-statistics.analyzeComments",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("Открой файл в редакторе, чтобы выполнить анализ.");
        return;
      }

      const doc = editor.document;
      const text = doc.getText();
      const lines = text.split(/\r?\n/);

      const totalLines = lines.length;
      const commentLines = lines.filter(isCommentLine).length;

      const todos = extractTodos(text);

      // 1) Показ статистики
      await vscode.window.showInformationMessage(
        `Статистика файла: строк всего ${totalLines}, строк-комментариев ${commentLines}, TODO/FIXME/NOTE/HACK: ${todos.length}`
      );

      // 2) Показ списка TODO (если есть)
      if (todos.length === 0) {
        return;
      }

      const items = todos.map(t => ({
        label: `Строка ${t.line}`,
        description: t.text
      }));

      const picked = await vscode.window.showQuickPick(items, {
        title: "Найденные TODO/FIXME/NOTE/HACK — выбери, чтобы перейти",
        matchOnDescription: true
      });

      if (!picked) return;

      const lineNum = parseInt(picked.label.replace(/\D+/g, ""), 10);
      const pos = new vscode.Position(Math.max(0, lineNum - 1), 0);
      editor.selection = new vscode.Selection(pos, pos);
      editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
