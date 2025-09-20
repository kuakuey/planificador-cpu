import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  status = signal<string>('');

  algorithm = 'FCFS';
  processes: Process[] = [{ id: 'P1', arrivalTime: 0, burstTime: 1, priority: 0 }];

  mostrarPopUp = false;
  infoPopUp = '';
  dataPopUp: any = {}; // ahora es un objeto, no un array

  constructor(private api: ApiService) {}

  agregarProceso() {
    const lastProcess = this.processes[this.processes.length - 1];
    const newArrivalTime = lastProcess ? lastProcess.arrivalTime + lastProcess.burstTime : 0;

    this.processes.push({
      id: 'P' + (this.processes.length + 1),
      arrivalTime: newArrivalTime,
      burstTime: 1,
      priority: 0,
    });
  }

  eliminarProceso(index: number) {
    this.processes.splice(index, 1);
  }

  Conexion() {
    const body = {
      algorithm: this.algorithm,
      processSimulationDto: this.processes,
    };

    this.api.testConnection(body).subscribe({
      next: (res) => {
        console.log('✅ Respuesta exitosa:', res);
        this.status.set('✅ Conectado (200 OK)');
        // Guardamos la respuesta directamente en el objeto
        this.abrirPopUp('Datos recibidos', res);
      },
      error: (err) => {
        console.error('❌ Error en la conexión:', err);
        this.status.set(`❌ Error: ${err.status} ${err.statusText}`);
      },
    });
  }

  abrirPopUp(info: string = 'Aquí van tus datos', data: any = {}) {
    this.infoPopUp = info;
    this.dataPopUp = data; // ahora es objeto
    this.mostrarPopUp = true;
  }

  // Cerrar pop-up
  cerrarPopUp() {
    this.mostrarPopUp = false;
  }
}
