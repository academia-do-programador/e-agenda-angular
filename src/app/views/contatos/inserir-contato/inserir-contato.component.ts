import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css'],
})
export class InserirContatoComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  get email() {
    return this.form.get('email');
  }

  gravar() {
    if (this.form.invalid) {
      const erros: string[] = [];

      for (let campo of Object.keys(this.form.controls)) {
        const controle = this.form.get(campo);

        if (!controle?.errors) continue;

        controle.markAsTouched();

        for (let erro of Object.keys(controle.errors)) {
          switch (erro) {
            case 'required':
              erros.push(`O campo "${campo}" é obrigatório!`);
              break;

            case 'email':
              erros.push(`O campo "${campo}" deve seguir um formato válido!`);
              break;
          }
        }
      }

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.contatoVM = this.form.value;

    this.contatoService.inserir(this.contatoVM).subscribe({
      next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastrService.success(
      `O contato "${contato.nome}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
