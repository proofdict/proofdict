---
layout: post
title: $1さらに
author: azu
editURL: >-
  https://github.com/proofdict/proofdict/edit/master/dict/$1さらに--01BQ92YWWKSTXDNGWVVE10WF9T.yml
date: 2017-08-20T08:53:05.126Z
permalink: /item/01BQ92YWWKSTXDNGWVVE10WF9T
id: 01BQ92YWWKSTXDNGWVVE10WF9T
description: ''
expected: $1さらに
patterns:
  - '/([\s。、\nぁ-んァ-ヶ])更に/'
specs:
  - from: Aは加速した、更に加速した。
    to: Aは加速した、さらに加速した。
  - from: 加速すると更に加速した
    to: 加速するとさらに加速した
  - from: 変更に加えて
    to: 変更に加えて
tags:
  - opinion
  - 表記統一

---

## Description

No Description 

## Patterns

This dictionary match following patterns:

    /([\s。、\nぁ-んァ-ヶ])更に/

## Expected

The text is matched and replaced to be:

    $1さらに

## Examples

| From           | To              |
| -------------- | --------------- |
| Aは加速した、更に加速した。 | Aは加速した、さらに加速した。 |
| 加速すると更に加速した    | 加速するとさらに加速した    |
| 変更に加えて         | 変更に加えて          |
