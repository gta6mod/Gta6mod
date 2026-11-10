import { ActiveSectionView } from '@/components/hero-section';
import { ModCategory, SitemapEntityType } from './types';

/**
 * 1. Portal View Navigation State Machine
 */
export interface PortalViewState {
  status: 'viewing_all' | 'viewing_section';
  activeView: ActiveSectionView;
  targetAnchor?: string;
}

export type PortalViewEvent =
  | { type: 'SELECT_VIEW'; view: ActiveSectionView; targetId?: string }
  | { type: 'RESET_VIEW' };

export function transitionPortalView(
  _state: PortalViewState,
  event: PortalViewEvent
): PortalViewState {
  switch (event.type) {
    case 'SELECT_VIEW':
      return {
        status: event.view === 'all' ? 'viewing_all' : 'viewing_section',
        activeView: event.view,
        targetAnchor: event.targetId,
      };
    case 'RESET_VIEW':
      return {
        status: 'viewing_all',
        activeView: 'all',
        targetAnchor: undefined,
      };
  }
}

/**
 * 2. Official Gallery Lightbox State Machine
 */
export type LightboxState =
  | { status: 'closed'; activeShotId: null }
  | { status: 'inspecting'; activeShotId: string };

export type LightboxEvent =
  | { type: 'OPEN_SHOT'; shotId: string }
  | { type: 'CLOSE_SHOT' };

export function transitionLightbox(
  _state: LightboxState,
  event: LightboxEvent
): LightboxState {
  switch (event.type) {
    case 'OPEN_SHOT':
      return { status: 'inspecting', activeShotId: event.shotId };
    case 'CLOSE_SHOT':
      return { status: 'closed', activeShotId: null };
  }
}

/**
 * 3. Gameplay Video Theater State Machine
 */
export interface VideoTheaterState {
  mode: 'interactive-preview' | 'youtube-iframe';
  activeVideoId: string;
  selectedHighlightIdx: number;
}

export type VideoTheaterEvent =
  | { type: 'SELECT_VIDEO'; videoId: string }
  | { type: 'SELECT_HIGHLIGHT'; index: number }
  | { type: 'SET_MODE'; mode: 'interactive-preview' | 'youtube-iframe' };

export function transitionVideoTheater(
  state: VideoTheaterState,
  event: VideoTheaterEvent
): VideoTheaterState {
  switch (event.type) {
    case 'SELECT_VIDEO':
      return {
        ...state,
        activeVideoId: event.videoId,
        selectedHighlightIdx: 0,
      };
    case 'SELECT_HIGHLIGHT':
      return {
        ...state,
        mode: 'interactive-preview',
        selectedHighlightIdx: event.index,
      };
    case 'SET_MODE':
      return {
        ...state,
        mode: event.mode,
      };
  }
}

/**
 * 4. Mod Directory Filter & Inspector State Machine
 */
export interface DirectoryFilterState {
  category: ModCategory;
  searchQuery: string;
  sortBy: 'downloads' | 'rating' | 'newest';
  inspectedModId: string;
}

export type DirectoryFilterEvent =
  | { type: 'SET_CATEGORY'; category: ModCategory }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_SORT'; sortBy: 'downloads' | 'rating' | 'newest' }
  | { type: 'INSPECT_MOD'; modId: string }
  | { type: 'RESET_FILTERS'; defaultModId: string };

export function transitionDirectoryFilter(
  state: DirectoryFilterState,
  event: DirectoryFilterEvent
): DirectoryFilterState {
  switch (event.type) {
    case 'SET_CATEGORY':
      return { ...state, category: event.category };
    case 'SET_QUERY':
      return { ...state, searchQuery: event.query };
    case 'SET_SORT':
      return { ...state, sortBy: event.sortBy };
    case 'INSPECT_MOD':
      return { ...state, inspectedModId: event.modId };
    case 'RESET_FILTERS':
      return {
        category: 'all',
        searchQuery: '',
        sortBy: 'downloads',
        inspectedModId: event.defaultModId,
      };
  }
}

/**
 * 5. Mod Submission Finite State Machine
 */
export type SubmissionMachineState =
  | { status: 'idle'; errors: Record<string, string>; message: null }
  | { status: 'invalid'; errors: Record<string, string>; message: null }
  | { status: 'submitting'; errors: Record<string, string>; message: null }
  | { status: 'published'; errors: Record<string, string>; message: string };

export type SubmissionMachineEvent =
  | { type: 'VALIDATION_FAILED'; errors: Record<string, string> }
  | { type: 'START_SUBMIT' }
  | { type: 'SUBMIT_SUCCESS'; message: string }
  | { type: 'RESET_FORM' };

export function transitionSubmission(
  _state: SubmissionMachineState,
  event: SubmissionMachineEvent
): SubmissionMachineState {
  switch (event.type) {
    case 'VALIDATION_FAILED':
      return { status: 'invalid', errors: event.errors, message: null };
    case 'START_SUBMIT':
      return { status: 'submitting', errors: {}, message: null };
    case 'SUBMIT_SUCCESS':
      return { status: 'published', errors: {}, message: event.message };
    case 'RESET_FORM':
      return { status: 'idle', errors: {}, message: null };
  }
}

/**
 * 6. Sitemap Inspector State Machine
 */
export interface SitemapInspectorState {
  shardId: number | 'all';
  entityType: SitemapEntityType | 'all';
  query: string;
  xmlMode: 'urlset' | 'sitemapindex';
}

export type SitemapInspectorEvent =
  | { type: 'TOGGLE_SHARD'; shardId: number }
  | { type: 'SET_ENTITY_TYPE'; entityType: SitemapEntityType | 'all' }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_XML_MODE'; xmlMode: 'urlset' | 'sitemapindex' };

export function transitionSitemapInspector(
  state: SitemapInspectorState,
  event: SitemapInspectorEvent
): SitemapInspectorState {
  switch (event.type) {
    case 'TOGGLE_SHARD':
      return {
        ...state,
        shardId: state.shardId === event.shardId ? 'all' : event.shardId,
      };
    case 'SET_ENTITY_TYPE':
      return { ...state, entityType: event.entityType };
    case 'SET_QUERY':
      return { ...state, query: event.query };
    case 'SET_XML_MODE':
      return { ...state, xmlMode: event.xmlMode };
  }
}