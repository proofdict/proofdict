---
layout: post
title: $1 $2
author: azu
editURL: >-
  https://github.com/proofdict/proofdict/edit/master/dict/Service_Worker--01BQ92YYBHGYFTTDANV4RNC3CJ.yml
date: 2017-08-20T08:53:06.816Z
permalink: /item/01BQ92YYBHGYFTTDANV4RNC3CJ
id: 01BQ92YYBHGYFTTDANV4RNC3CJ
description: >-
  Should have a space between words. Reference
  https://github.com/w3c/ServiceWorker
expected: $1 $2
patterns:
  - /(service)(worker)/i
specs:
  - from: This is serviceworker?
    to: This is service worker?
  - from: ServiceWorker
    to: Service Worker
tags:
  - noun
  - JavaScript

---

## Description

Should have a space between words. Reference https://github.com/w3c/ServiceWorker

## Patterns

This dictionary match following patterns:

    /(service)(worker)/i

## Expected

The text is matched and replaced to be:

    $1 $2

## Examples

| From                   | To                      |
| ---------------------- | ----------------------- |
| This is serviceworker? | This is service worker? |
| ServiceWorker          | Service Worker          |
