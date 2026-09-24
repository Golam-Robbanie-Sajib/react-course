-- Per-course progress for the multi-course platform (HTML, C, React, ...).
--
-- Stores a JSON object keyed by course id:
--   { "html": { "completedDays": [1,2], "notes": {"1": "..."},
--               "confidenceRatings": {"1": 4}, "examHighest": 90, "examLast": 85 },
--     "c": { ... }, "react": { ... } }
--
-- Until this runs, the app keeps HTML and C progress on the learner's device
-- and React progress in the legacy columns, so nothing is lost either way.
-- Safe to run more than once.

alter table public.profiles
  add column if not exists course_progress jsonb not null default '{}'::jsonb;

-- Backfill: copy each learner's existing React progress out of the legacy
-- columns so it isn't hidden once course_progress exists.
update public.profiles
set course_progress = course_progress || jsonb_build_object(
  'react', jsonb_build_object(
    'completedDays',     coalesce(to_jsonb(completed_days), '[]'::jsonb),
    'notes',             coalesce(notes::jsonb, '{}'::jsonb),
    'confidenceRatings', coalesce(confidence_ratings::jsonb, '{}'::jsonb),
    'examHighest',       exam_highest_score,
    'examLast',          exam_last_score
  )
)
where not (course_progress ? 'react')
  and (
    coalesce(array_length(completed_days, 1), 0) > 0
    or exam_highest_score is not null
    or coalesce(notes::jsonb, '{}'::jsonb) <> '{}'::jsonb
  );

-- Existing row-level-security policies on profiles already restrict updates
-- to the owner's row; the new column inherits them.
