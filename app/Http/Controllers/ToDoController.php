<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ToDoModel; // using the todos model for database operations.

class ToDoController extends Controller
{
   
    
    public function store(Request $request){
        // dd($request->all());
        $request->validate(
            [
                'name'=>'required',
                'work'=>'required',
                'due_date'=>'required'
            ]
            );

            $todo = ToDoModel::create([
                'name' => $request->name,
                'work' => $request->work,
                'due_date' => $request->due_date
            ]);

            return response()->json([
                'todo' => $todo
            ]);

           
            // return redirect(route("todo.home"));
        }
    
    public function delete($id){
        ToDoModel::find($id)->delete();
        return redirect(route("todo.home"));
    }

    public function edit($id){
        $todo=ToDoModel::find($id);
        $data=compact('todo');
        return view("update")->with($data);
    }

    public function updateData(Request $request){
        $request->validate(
            [
                'name'=>'required',
                'work'=>'required',
                'duedate'=>'required'
            ]
            );
            $id = $request['id'];
            $todo=ToDoModel::find($id);            
            
            $todo->name=$request['name'];
            $todo->work=$request['work'];
            $todo->duedate=$request['duedate'];
            $todo->save();
            return redirect(route("todo.home"));
    }
}