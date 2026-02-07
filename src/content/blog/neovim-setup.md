---
title: 'Neovim Setup pre Produktivitu'
excerpt: 'Môj aktuálny Neovim config s LSP, Telescope a ďalšími pluginmi pre efektívny coding workflow.'
date: '2026-01-05'
readTime: '10 min'
tags: ['neovim', 'productivity', 'tools']
---

## Plugin Manager: lazy.nvim

Začínam s [lazy.nvim](https://github.com/folke/lazy.nvim) - rýchly a moderný plugin manager.

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")
```

## LSP Configuration

Pre TypeScript, Go, Rust a Python používam `nvim-lspconfig` s automatickým formatovaním.

```lua
-- plugins/lsp.lua
return {
  'neovim/nvim-lspconfig',
  dependencies = {
    'williamboman/mason.nvim',
    'williamboman/mason-lspconfig.nvim',
  },
  config = function()
    require('mason').setup()
    require('mason-lspconfig').setup({
      ensure_installed = { 'tsserver', 'gopls', 'rust_analyzer' }
    })

    local lspconfig = require('lspconfig')
    lspconfig.tsserver.setup{}
    lspconfig.gopls.setup{}
    lspconfig.rust_analyzer.setup{}
  end
}
```

## Telescope - Fuzzy Finder

Najdôležitejší plugin pre navigáciu v projektoch.

```lua
return {
  'nvim-telescope/telescope.nvim',
  dependencies = { 'nvim-lua/plenary.nvim' },
  keys = {
    { '<leader>ff', '<cmd>Telescope find_files<cr>' },
    { '<leader>fg', '<cmd>Telescope live_grep<cr>' },
    { '<leader>fb', '<cmd>Telescope buffers<cr>' },
  }
}
```

## Treesitter

Pre syntax highlighting a code navigation.

```lua
return {
  'nvim-treesitter/nvim-treesitter',
  build = ':TSUpdate',
  config = function()
    require('nvim-treesitter.configs').setup({
      ensure_installed = { 'lua', 'typescript', 'rust', 'go' },
      highlight = { enable = true },
      indent = { enable = true },
    })
  end
}
```

## Moje Key Bindings

```lua
vim.g.mapleader = ' '

-- File operations
vim.keymap.set('n', '<leader>w', ':w<CR>')
vim.keymap.set('n', '<leader>q', ':q<CR>')

-- Window navigation
vim.keymap.set('n', '<C-h>', '<C-w>h')
vim.keymap.set('n', '<C-j>', '<C-w>j')
vim.keymap.set('n', '<C-k>', '<C-w>k')
vim.keymap.set('n', '<C-l>', '<C-w>l')

-- Buffer navigation
vim.keymap.set('n', '<S-l>', ':bnext<CR>')
vim.keymap.set('n', '<S-h>', ':bprevious<CR>')
```

## Tip: Lazy Loading

Použi lazy loading pre rýchlejší startup:

```lua
return {
  'plugin-name',
  lazy = true,
  event = 'VeryLazy',  -- alebo
  ft = 'typescript',   -- alebo
  cmd = 'CommandName', -- alebo
  keys = '<leader>x',
}
```
