"use client";

import { useState } from "react";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image, Type } from "lucide-react";

export function RichTextEditor({ name, defaultValue = "" }: { name: string, defaultValue?: string }) {
  const [content, setContent] = useState(defaultValue);
  const [mode, setMode] = useState<'write' | 'preview'>('write');

  const insertSyntax = (syntax: string) => {
    setContent(prev => prev + syntax);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={() => insertSyntax('**bold** ')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertSyntax('*italic* ')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => insertSyntax('### Heading\n')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <Type className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertSyntax('- List item\n')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertSyntax('1. List item\n')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => insertSyntax('[Link Text](url) ')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertSyntax('![Image Alt](url) ')} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded">
          <Image className="w-4 h-4" />
        </button>

        <div className="flex-1"></div>
        <div className="flex bg-gray-200 rounded-md p-0.5">
          <button type="button" onClick={() => setMode('write')} className={`px-3 py-1 text-xs font-medium rounded-sm ${mode === 'write' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Write</button>
          <button type="button" onClick={() => setMode('preview')} className={`px-3 py-1 text-xs font-medium rounded-sm ${mode === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Preview</button>
        </div>
      </div>

      {/* Editor Area */}
      {mode === 'write' ? (
        <textarea
          name={name}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-4 focus:outline-none resize-y"
          placeholder="Write your content here using markdown format..."
        />
      ) : (
        <div className="w-full h-64 p-4 overflow-y-auto prose prose-sm max-w-none text-gray-700 bg-gray-50">
          {/* Simple preview illusion (ideally we parse markdown, but this demonstrates the concept) */}
          <input type="hidden" name={name} value={content} />
          {content ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <span className="text-gray-400 italic">Nothing to preview...</span>
          )}
        </div>
      )}
    </div>
  );
}
