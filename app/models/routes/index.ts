// const express = require('express');
// const router = require('express').Router();
// const pockerMethods = require('../../services/poker.ts');
import express, { Router } from 'express';
import { getRepository } from 'typeorm';
import { pocker } from '../../services/poker';
const router: Router = express.Router();


router.post('/', (req, res) => {
  console.log('---pocker', pocker(req.body.hands), '---results結果だけを取得する', pockerMethods(req.body.hands).results[0]);
  console.log('---body', req.body.hands)
});

export default router;

// module.exports = router;