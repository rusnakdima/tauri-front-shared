/**
 * Pre-built Handler Templates
 * 
 * These are template definitions that can be referenced in schema JSON.
 * They provide standard patterns for common operations.
 */

import type { HandlerDefinition } from '../handler-executor/handler-executor.service';

/**
 * CRUD operation handlers
 * Standard patterns for entity CRUD operations
 */
export const CRUD_HANDLERS: Record<string, HandlerDefinition> = {
  // === Entity CRUD Operations ===

  'entity.get': {
    invoke: 'crud_get',
    args: [{ id: '$event.detail.id' }],
    resultTo: '$store.entity.current'
  },

  'entity.getAll': {
    invoke: 'crud_get_all',
    resultTo: '$store.entity.list'
  },

  'entity.create': {
    invoke: 'crud_create',
    args: ['$store.entity.form'],
    resultTo: '$store.entity.current',
    then: 'toast.success.create'
  },

  'entity.update': {
    invoke: 'crud_update',
    args: ['$store.entity.id', '$store.entity.form'],
    resultTo: '$store.entity.current',
    then: 'toast.success.update'
  },

  'entity.patch': {
    invoke: 'crud_patch',
    args: ['$store.entity.id', '$store.entity.form'],
    resultTo: '$store.entity.current',
    then: 'toast.success.update'
  },

  'entity.delete': {
    invoke: 'crud_delete',
    args: ['$event.detail.id'],
    sequence: ['entity.getAll', 'toast.success.delete']
  },

  // === Sort Algorithm Handlers ===

  'algo.sortQuick': {
    algo: { name: 'sort.quick', input: { data: '$store.list', order: 'asc' } },
    resultTo: '$store.list.sorted'
  },

  'algo.sortMerge': {
    algo: { name: 'sort.merge', input: { data: '$store.list', order: 'asc' } },
    resultTo: '$store.list.sorted'
  },

  // === Search Handlers ===

  'algo.search': {
    algo: { name: 'search.schemas', input: { items: '$store.list', query: '$event.detail.query' } },
    resultTo: '$store.list.filtered'
  },

  // === Pagination Handlers ===

  'algo.paginate': {
    algo: { name: 'search.paginate', input: { items: '$store.list', page: 1, limit: 20 } },
    resultTo: '$store.list.page'
  },

  // === Validation Handlers ===

  'algo.validateEmail': {
    algo: { name: 'validate.email', input: { email: '$store.form.email' } },
    resultTo: '$store.validation.emailValid'
  },

  'algo.validateInput': {
    algo: { name: 'validate.input', input: { input: '$store.form.input', maxLength: 255 } },
    resultTo: '$store.validation.inputValid'
  },

  'algo.sanitize': {
    algo: { name: 'validate.sanitize', input: { input: '$store.form.input' } },
    resultTo: '$store.form.sanitized'
  },

  // === Navigation Handlers ===

  'nav.details': {
    navigate: '/details/{id}',
    set: { store: 'nav', field: 'params', from: '$event.detail' }
  },

  'nav.back': {
    historyBack: true
  },

  'nav.external': {
    redirect: '$event.detail.url'
  },

  // === UI Feedback Handlers ===

  'toast.success.create': {
    toast: { message: 'Created successfully', type: 'success', duration: 3000 }
  },

  'toast.success.update': {
    toast: { message: 'Updated successfully', type: 'success', duration: 3000 }
  },

  'toast.success.delete': {
    toast: { message: 'Deleted successfully', type: 'success', duration: 3000 }
  },

  'toast.error.generic': {
    toast: { message: 'An error occurred', type: 'error', duration: 5000 }
  },

  // === Modal Handlers ===

  'modal.confirmDelete': {
    modal: { 
      component: 'confirm-dialog', 
      props: { title: 'Delete?', message: 'Are you sure?' }, 
      onClose: 'handler.handleDelete' 
    }
  },

  'modal.close': {
    closeOverlay: 'modal-region'
  }
} as const;

/**
 * Algorithm operation handlers
 * Pre-configured algorithm handlers for common operations
 */
export const ALGO_HANDLERS: Record<string, HandlerDefinition> = {
  // === Sort Algorithms ===

  'algo.sort.bubble': {
    algo: { name: 'sort.bubble', input: { data: [], order: 'asc' } }
  },

  'algo.sort.insertion': {
    algo: { name: 'sort.insertion', input: { data: [], order: 'asc' } }
  },

  'algo.sort.merge': {
    algo: { name: 'sort.merge', input: { data: [], order: 'asc' } }
  },

  'algo.sort.quick': {
    algo: { name: 'sort.quick', input: { data: [], order: 'asc' } }
  },

  // === Search Algorithms ===

  'algo.search.schemas': {
    algo: { name: 'search.schemas', input: { items: [], query: '' } }
  },

  'algo.search.paginate': {
    algo: { name: 'search.paginate', input: { items: [], page: 1, limit: 20 } }
  },

  // === Graph Algorithms ===

  'algo.graph.dijkstra': {
    algo: { name: 'graph.dijkstra', input: { nodes: [], edges: [], start: '', end: '' } }
  },

  // === Validation Algorithms ===

  'algo.validate.email': {
    algo: { name: 'validate.email', input: { email: '' } }
  },

  'algo.validate.input': {
    algo: { name: 'validate.input', input: { input: '', maxLength: 255 } }
  },

  'algo.validate.sanitize': {
    algo: { name: 'validate.sanitize', input: { input: '' } }
  }
} as const;

/**
 * UI feedback handlers
 * Pre-built toast, modal, and overlay handlers
 */
export const UI_HANDLERS: Record<string, HandlerDefinition> = {
  // === Toast Success ===

  'toast.success': {
    toast: { message: 'Success', type: 'success', duration: 3000 }
  },

  'toast.success.create': {
    toast: { message: 'Created successfully', type: 'success', duration: 3000 }
  },

  'toast.success.update': {
    toast: { message: 'Updated successfully', type: 'success', duration: 3000 }
  },

  'toast.success.delete': {
    toast: { message: 'Deleted successfully', type: 'success', duration: 3000 }
  },

  // === Toast Error ===

  'toast.error': {
    toast: { message: 'An error occurred', type: 'error', duration: 5000 }
  },

  'toast.error.generic': {
    toast: { message: 'An error occurred', type: 'error', duration: 5000 }
  },

  'toast.error.create': {
    toast: { message: 'Failed to create', type: 'error', duration: 5000 }
  },

  'toast.error.update': {
    toast: { message: 'Failed to update', type: 'error', duration: 5000 }
  },

  'toast.error.delete': {
    toast: { message: 'Failed to delete', type: 'error', duration: 5000 }
  },

  // === Toast Warning ===

  'toast.warning': {
    toast: { message: 'Warning', type: 'warning', duration: 4000 }
  },

  'toast.warning.create': {
    toast: { message: 'Create operation failed', type: 'warning', duration: 4000 }
  },

  'toast.warning.update': {
    toast: { message: 'Update operation failed', type: 'warning', duration: 4000 }
  },

  'toast.warning.delete': {
    toast: { message: 'Delete operation failed', type: 'warning', duration: 4000 }
  },

  // === Toast Info ===

  'toast.info': {
    toast: { message: 'Information', type: 'info', duration: 3000 }
  },

  // === Modal Handlers ===

  'modal.confirm': {
    modal: { 
      component: 'confirm-dialog', 
      props: { title: 'Confirm', message: 'Are you sure?' } 
    }
  },

  'modal.confirmDelete': {
    modal: { 
      component: 'confirm-dialog', 
      props: { title: 'Delete?', message: 'Are you sure you want to delete this item?' }, 
      onClose: 'handler.handleDelete' 
    }
  },

  'modal.close': {
    closeOverlay: 'modal-region'
  }
} as const;

/**
 * Navigation handlers
 * Pre-built navigation and routing handlers
 */
export const NAVIGATION_HANDLERS: Record<string, HandlerDefinition> = {
  // === Internal Navigation ===

  'nav.details': {
    navigate: '/details/{id}',
    set: { store: 'nav', field: 'params', from: '$event.detail' }
  },

  'nav.list': {
    navigate: '/list'
  },

  'nav.create': {
    navigate: '/create'
  },

  'nav.edit': {
    navigate: '/edit/{id}',
    set: { store: 'nav', field: 'params', from: '$event.detail' }
  },

  // === History Navigation ===

  'nav.back': {
    historyBack: true
  },

  'nav.forward': {
    historyForward: true
  },

  // === External Navigation ===

  'nav.external': {
    redirect: '$event.detail.url'
  },

  'nav.external.static': {
    redirect: 'https://example.com'
  }
} as const;

/**
 * Store operation handlers
 * Pre-built handlers for store operations
 */
export const STORE_HANDLERS: Record<string, HandlerDefinition> = {
  // === Set Single Value ===

  'store.set': {
    set: { store: '$store.target.store', field: '$store.target.field', from: '$event.detail.value' }
  },

  'store.setFromEvent': {
    set: { store: 'target', field: 'value', from: '$event.detail' }
  },

  // === Set Multiple Values ===

  'store.setMany': {
    setMany: {
      '$store.target.fieldA': '$event.detail.valueA',
      '$store.target.fieldB': '$event.detail.valueB'
    }
  },

  // === Swap Values ===

  'store.swap': {
    swap: ['$store.source.valueA', '$store.target.valueA']
  },

  // === Clear Store ===

  'store.clear': {
    setMany: {
      '$store.target.list': '[]',
      '$store.target.current': 'null',
      '$store.target.loading': 'false'
    }
  },

  // === Reset Form ===

  'store.resetForm': {
    setMany: {
      '$store.form': '{}'
    }
  }
} as const;

/**
 * Combined all handlers for easy import
 */
export const ALL_HANDLERS = {
  ...CRUD_HANDLERS,
  ...ALGO_HANDLERS,
  ...UI_HANDLERS,
  ...NAVIGATION_HANDLERS,
  ...STORE_HANDLERS
} as const;
