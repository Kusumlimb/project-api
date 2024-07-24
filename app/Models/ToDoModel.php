<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoModel extends Model
{
    use HasFactory;
    protected $table='todos';
    protected $primary_key='id';

    protected $fillable = [
        'name',
        'work',
        'due_date',
        'image'
    ];
}